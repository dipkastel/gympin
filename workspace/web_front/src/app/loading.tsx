import {JSX} from "react";

export default function Loading(): JSX.Element {
    return (<div className="loader-container">
        <div style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: "4px solid #f0e4dd",
            borderTopColor: "#e7333e",
            animation: "gympin-spin 0.8s linear infinite",
        }}/>
        <style>{` @keyframes gympin-spin { to { transform: rotate(360deg); } } `}</style>
    </div>);
}
