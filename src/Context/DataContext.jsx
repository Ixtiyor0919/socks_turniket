import { InputNumber, Input } from "antd";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import instance from "../Api/Axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [dataTurnstileData, setTurnstileData] = useState([]);
    const [workerData, setWorkerData] = useState([]);
    let location = useLocation();

    const turnstileData = [
        {
            name: "name",
            label: "Ismi",
            input: <Input style={{ width: "100%" }} />,
        },
        {
            name: "hourlyWages",
            label: "Soatlik ish haqi",
            input: <InputNumber style={{ width: "100%" }} />,
        },
    ];

    const editTurnstileData = [
        {
            name: "name",
            label: "Ismi",
            input: <Input style={{ width: "100%" }} />,
        },
        {
            name: "hourlyWages",
            label: "Soatlik ish haqi",
            input: <InputNumber style={{ width: "100%" }} />,
        },
    ];

    const formWorkerData = [
        {
            name: "fio",
            label: "Ismi",
            input: <Input style={{ width: "100%" }} />,
        },
        {
            name: "phoneNumber",
            label: "Ishchining nomeri",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "positionId",
            label: "positionId",
            input: <Input style={{ width: "100%" }} />,
        },
    ];

    const editWorkerData = [
        {
            name: "fio",
            label: "Ismi",
            input: <Input style={{ width: "100%" }} />,
        },
        {
            name: "phoneNumber",
            label: "Soatlik ish haqi",
            input: <Input style={{ width: "100%" }} />,
        },
        {
            name: "positionId",
            label: "positionId",
            input: <InputNumber style={{ width: "100%" }} />,
        },
    ];

    const getPositionData = () => {
        instance
            .get("api/turnstile/position/list")
            .then((data) => {
                setTurnstileData(data.data.data);
            })
            .catch((err) => console.error(err));
    };

    const getWorkerData = () => {
        instance
            .get("api/turnstile/worker/getAll")
            .then((data) => {
                setWorkerData(data.data.data);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getPositionData();
        getWorkerData();
    }, []);

    let formData = {};

    switch (location.pathname) {
        case "/": {
            formData = {
                formData: turnstileData,
                editFormData: editTurnstileData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "O'zgartirish",
                modalTitle: "Yangi qo'shish",
            };
            break;
        }
        case "/workers": {
            formData = {
                formData: formWorkerData,
                editFormData: editWorkerData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "O'zgartirish",
                modalTitle: "Yangi qo'shish",
            };
            break;
        }
        default: {
            formData = { ...formData };
        }
    }

    const value = {
        formData,
        dataTurnstileData,
        workerData
    };

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
};
