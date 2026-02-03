interface IProps {
  message: string;
}
function ErrorMessage({ message }: IProps) {
  return (
    <div className="error">
      <p>
        <span>⛔</span>
        {message}
      </p>
    </div>
  );
}

export { ErrorMessage };
