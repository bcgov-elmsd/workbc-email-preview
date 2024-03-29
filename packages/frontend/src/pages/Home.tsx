import { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";
// import axios from "axios";
import { createHTMLEmail } from "../utils/htmlEmail";
import Preview from "../components/Preview";
import CodeEditorArray from "../components/CodeEditorArray";
import Modal from "../components/Modal";
import apiService from "../service/api-service";
import { useKeycloak } from "@react-keycloak/web";

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

function Home() {
  const { keycloak } = useKeycloak();
  const [files, setFiles] = useState("");
  const [title, setTitle] = useState("Title");
  const [subject, setSubject] = useState("Subject");
  const [email, setEmail] = useState("Email");
  const [mainValueArray, setMainValueArray] = useState(["<div>Start</div>"]); // [string, React.Dispatch<React.SetStateAction<string>>
  const [boxValueArray, setBoxValueArray] = useState(["<div>Box</div>"]);
  const [endValueArray, setEndValueArray] = useState(["<div>End</div>"]);

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(
        {
          subject,
          title,
          start: mainValueArray,
          box: boxValueArray,
          end: endValueArray,
        },
        null,
        "\t"
      )
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "email.json";

    link.click();
  };
  const handleFileChange = (e: unknown) => {
    const fileReader = new FileReader();
    fileReader.readAsText((e as HTMLInputEvent).target?.files![0], "UTF-8");
    fileReader.onload = (e) => {
      console.log("e.target.result", e.target?.result);
      setFiles(e.target?.result?.toString() || "");
      console.log("files", JSON.parse(files));
    };
  };

  const sendEmail = async (html: string, subject: string, context: unknown) => {
    try {
      const token = keycloak.token;
      await apiService
        .getAxiosInstance()
        .post(
          "/email",
          {
            html,
            subject,
            context,
            email,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          toast.success("📨 Email Sent!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        })
        .catch((error) => {
          console.error(error);
          toast.error("😔 Email Failed! " + error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendEmail = () => {
    const html = createHTMLEmail(
      title,
      mainValueArray.map((value) => value.toString().replace(/(\r\n|\n|\r)/gm, "")),
      boxValueArray.map((value) => value.toString().replace(/(\r\n|\n|\r)/gm, "")),
      endValueArray.map((value) => value.toString().replace(/(\r\n|\n|\r)/gm, ""))
    );
    sendEmail(html, subject, {});
  };

  useEffect(() => {
    if (files.length > 0) {
      const parsedFiles = JSON.parse(files);
      setSubject(parsedFiles.subject);
      setTitle(parsedFiles.title);
      setMainValueArray(parsedFiles.start);
      setBoxValueArray(parsedFiles.box);
      setEndValueArray(parsedFiles.end);
    }
  }, [files]);
  return (
    <>
      <Modal save={(text: string) => setFiles(text)} modalId="TextInput" />
      <div className="bg-light m-4">
        <div className="d-flex justify-content-start">
          <button className="btn btn-primary mt-3" onClick={exportData}>
            Export JSON
          </button>
          <button type="button" className="btn btn-primary mt-3 ml-2" data-toggle="modal" data-target="#TextInput">
            Import JSON text
          </button>
          <input className="btn btn-primary mt-3 ml-2" type="file" onChange={handleFileChange} />
          <input
            type="text"
            className="mt-3 ml-2"
            placeholder="Test Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-primary mt-3 ml-2" onClick={handleSendEmail}>
            Test email
          </button>
        </div>
        <div className="d-flex flex-row justify-content-around pt-5">
          <div className="col w-50" style={{ height: "100vh", overflowY: "auto" }}>
            <h2>Sections:</h2>
            <h3>Subject</h3>
            <input
              type="text"
              className="form-control mb-2"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <h3>Title</h3>
            <input type="text" className="form-control mb-2" value={title} onChange={(e) => setTitle(e.target.value)} />
            <h3>Main Content</h3>
            {mainValueArray.length === 0 && (
              <button
                type="button"
                className="btn btn-primary mb-2"
                onClick={() => setMainValueArray([...mainValueArray, "<div>Hello World</div>"])}
              >
                Add
              </button>
            )}
            <CodeEditorArray valueArray={mainValueArray} setValueArray={setMainValueArray} />
            <h3>Box</h3>
            {boxValueArray.length === 0 && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setBoxValueArray([...boxValueArray, "<div>Hello World</div>"])}
              >
                Add
              </button>
            )}
            <CodeEditorArray valueArray={boxValueArray} setValueArray={setBoxValueArray} />
            <h3>End</h3>
            {endValueArray.length === 0 && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setEndValueArray([...endValueArray, "<div>Hello World</div>"])}
              >
                Add
              </button>
            )}
            <CodeEditorArray valueArray={endValueArray} setValueArray={setEndValueArray} />
          </div>
          <div className="col ">
            <h2>Email Preview</h2>
            <Preview
              html={createHTMLEmail(
                title,
                mainValueArray.map((value) => value.toString().replace(/(\r\n|\n|\r)/gm, "")),
                boxValueArray.map((value) => value.toString().replace(/(\r\n|\n|\r)/gm, "")),
                endValueArray.map((value) => value.toString().replace(/(\r\n|\n|\r)/gm, ""))
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
