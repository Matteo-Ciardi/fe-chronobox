import { useState } from "react";

import "./ConfirmRemoveAll.css";

const ConfirmRemoveAll = ({ buttonText, confirmMessage, onConfirm }) => {
	const [showConfirm, setShowConfirm] = useState(false);

	return (
		<>
			<button
				className="remove-all-btn"
				onClick={() => setShowConfirm(true)}
			>
				{buttonText}
			</button>
			{showConfirm && (
				<div className="confirm-modal-overlay">
					<div className="confirm-modal">
						<p>{confirmMessage}</p>
						<div className="confirm-buttons">
							<button
								className="confirm-yes"
								onClick={() => {
									onConfirm();
									setShowConfirm(false);
								}}
							>
								Sì
							</button>
							<button
								className="confirm-no"
								onClick={() => setShowConfirm(false)}
							>
								No
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ConfirmRemoveAll;
