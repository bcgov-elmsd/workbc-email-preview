const Preview = ({ html }: { html: string }) => {
  return <article dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Preview;
