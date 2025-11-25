import { useState, useRef, useEffect } from "react";
import "./RangeSlider.css";

const RangeSlider = ({
	minValue,
	maxValue,
	onMinChange,
	onMaxChange,
	min = 0,
	max = 100,
}) => {
	const trackRef = useRef(null);
	const minInputRef = useRef(null);
	const maxInputRef = useRef(null);

	// Aggiorna il track visuale quando i valori cambiano
	useEffect(() => {
		if (trackRef.current) {
			const minPercent = ((minValue - min) / (max - min)) * 100;
			const maxPercent = ((maxValue - min) / (max - min)) * 100;
			trackRef.current.style.left = `${minPercent}%`;
			trackRef.current.style.right = `${100 - maxPercent}%`;
		}
	}, [minValue, maxValue, min, max]);

	const handleMinChange = (e) => {
		const newMin = Number(e.target.value);
		if (newMin <= maxValue) {
			onMinChange(newMin);
		}
	};

	const handleMaxChange = (e) => {
		const newMax = Number(e.target.value);
		if (newMax >= minValue) {
			onMaxChange(newMax);
		}
	};

	return (
		<div className="range-slider-wrapper">
			<div className="range-values">
				<div className="range-value-item">
					<label>Prezzo Min</label>
					<input
						type="number"
						min={min}
						max={maxValue}
						value={minValue}
						onChange={(e) => onMinChange(Number(e.target.value))}
						className="range-value-input"
					/>
				</div>
				<div className="range-value-item">
					<label>Prezzo Max</label>
					<input
						type="number"
						min={minValue}
						max={max}
						value={maxValue}
						onChange={(e) => onMaxChange(Number(e.target.value))}
						className="range-value-input"
					/>
				</div>
			</div>

			<div className="range-slider-container">
				<div className="range-track">
					<div className="range-track-filled" ref={trackRef} />
				</div>

				<input
					ref={minInputRef}
					type="range"
					min={min}
					max={max}
					value={minValue}
					onChange={handleMinChange}
					className="range-input range-input-min"
				/>

				<input
					ref={maxInputRef}
					type="range"
					min={min}
					max={max}
					value={maxValue}
					onChange={handleMaxChange}
					className="range-input range-input-max"
				/>
			</div>
		</div>
	);
};

export default RangeSlider;
