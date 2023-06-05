// import Toast from 'react-bootstrap/Toast';

const App = (props) => {
  const { children } = props;

  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">Hexlet Chat</a>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default App;
