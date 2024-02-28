import { useState } from "react";

const Modal = ({ save, modalId }: { save: (text: string) => void; modalId: string }) => {
  const [text, setText] = useState<string>("");
  return (
    <dialog className="modal fade" id={modalId} tabIndex={1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Modal title
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <textarea
                className="form-control"
                rows={10}
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => save(text)}>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
