import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";

const CenterModal = ({
	header,
	desc,
	BtnName,
	BtnOnClick,
	isModalShow,
	onHide,
}) => {
	return (
		<Modal
			show={isModalShow}
			onHide={onHide}
			size='sm-down'
			aria-labelledby='contained-modal-title-vcenter'
			centered
      fullscreen={'sm-down'}>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>{header}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>{desc}</p>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={BtnOnClick}>{BtnName}</Button>
			</Modal.Footer>

		</Modal>
	);
};

CenterModal.propTypes = {
	header: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired,
	BtnName: PropTypes.string.isRequired,
	BtnOnClick: PropTypes.func.isRequired,
	isModalShow: PropTypes.bool.isRequired,
	onHide: PropTypes.func,
};

CenterModal.defaultProps = {
	onHide: () => {},
};


export default CenterModal;
