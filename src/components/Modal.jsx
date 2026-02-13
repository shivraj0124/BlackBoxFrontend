const Modal = ({ fileName, onClose }) => {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Warning ⚠</h3>
        <p>
          Penalty will be taken to open this file:
          <strong> {fileName}</strong>
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "300px",
  textAlign: "center"
};

export default Modal;
