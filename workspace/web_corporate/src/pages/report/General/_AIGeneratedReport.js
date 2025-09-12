import React, {useContext, useEffect, useRef, useState} from 'react';
import BaseReportBox, {LoadStatus} from "../BaseReportBox";
import {ErrorContext} from "../../../components/GympinPagesProvider";
import {Report_getAiReport} from "../../../network/api/report.api";
import {Typography} from "@mui/material";

const _AIGeneratedReport = ({corporate}) => {


    const error = useContext(ErrorContext);
    const [loadStatus, setLoadStatus] = useState(LoadStatus.LOADING);
    const [inputData, setInputData] = useState([]);


    useEffect(() => {
        getAiReport();
    }, [corporate]);


    function getAiReport() {
        setLoadStatus(LoadStatus.LOADING);
        if (!corporate) return;
        Report_getAiReport({id: corporate?.Id}).then(result => {
            console.log(result);
            if (result?.data?.Data?.length > 0) {
                setInputData(result.data.Data);
                setLoadStatus(LoadStatus.LOADED);
            } else {
                setLoadStatus(LoadStatus.NODATA);
            }
        })
            .catch(e => {
                try {
                    setLoadStatus(LoadStatus.ERROR);
                    error.showError({message: e.response.data.Message});
                } catch (f) {
                    error.showError({message: "خطا نا مشخص",});
                }
            });
    };

    const TypingText = ({items, speed = 150}) => {
        const [currentSentence, setCurrentSentence] = useState(0);
        const [currentText, setCurrentText] = useState([]);
        const textRef = useRef([]); // 👈 متن موقتی اینجا نگه‌داری میشه

        useEffect(() => {
            if (currentSentence >= items.length) return;

            const words = items[currentSentence].split(/\s+/).filter(Boolean);
            let index = 0;

            textRef.current[currentSentence] = "";

            const interval = setInterval(() => {
                if (index < words.length) {
                    // مستقیم روی ref آپدیت می‌کنیم
                    textRef.current[currentSentence] =
                        (textRef.current[currentSentence] + " " + words[index]).trim();

                    // بعد state رو sync می‌کنیم
                    setCurrentText([...textRef.current]);

                    index++;
                } else {
                    clearInterval(interval);
                    setTimeout(() => {
                        setCurrentSentence((s) => s + 1);
                    }, 800);
                }
            }, speed);

            return () => clearInterval(interval);
        }, [currentSentence, items, speed]);

        return (
            <div>
                {currentText.map((line, i) => (
                    <Typography variant={"subtitle1"} sx={{textAlign:"justify"}} key={i}>{line}</Typography>
                ))}
            </div>
        );
    };

    return (<>
            <BaseReportBox title={"گزارش کلی هوش مصنوعی"} loadStatus={loadStatus} ReloadData={getAiReport}>
                <TypingText items={inputData} speed={50}/>
            </BaseReportBox>

        </>
    );
};

export default _AIGeneratedReport;
