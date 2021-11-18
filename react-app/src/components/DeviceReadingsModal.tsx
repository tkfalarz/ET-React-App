import '../styles/DeviceReadingsModal.css'

const DeviceReadingsModal = (props: any) => {
  const deviceName = props.deviceName;
  const setModal = props.setModal

  return (
    <div id="modal">
        <button key="btn" onClick={() => setModal(false)}>Exit</button>
      <p>{deviceName}</p>
    </div>
  );
};

export default DeviceReadingsModal