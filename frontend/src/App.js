// import Toast from 'react-bootstrap/Toast';

const App = (props) => {
  const { children } = props;

  return (
    <body className="h-100 bg-light">
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
              <div className="container">
                <a className="navbar-brand" href="/">Hexlet Chat</a>
              </div>
            </nav>
            {children}
          </div>
        </div>
      </div>
    </body>
  );
};

export default App;
