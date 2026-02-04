interface IProps {
  children: React.ReactNode;
}

function Main({ children }: IProps) {
  return <main className="main">{children}</main>;
}

export { Main };
