import { InputNumber, Input } from "antd";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import instance from "../Api/Axios";
import CustomSelect from "../Module/Select/Select";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [dataTurnstileData, setTurnstileData] = useState([]);
    const [workerData, setWorkerData] = useState([]);
    const [monthData, setMonthsData] = useState([]);
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
            name: "positionId",
            label: "Lavozimlar",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Lavozim tanlang"}
                    selectData={dataTurnstileData?.map((item) => ({
                        ...item,
                        name: item.name,
                    }))}
                />
            ),
        },
        {
            name: "phoneNumber",
            label: "Ishchining nomeri",
            input: <InputNumber style={{ width: "100%" }} />,
        },
    ];

    const editWorkerData = [
        {
            name: "fio",
            label: "Ismi",
            input: <Input style={{ width: "100%" }} />,
        },
        {
            name: "positionId",
            label: "Lavozimlar",
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Lavozim tanlang"}
                    selectData={dataTurnstileData?.map((item) => ({
                        ...item,
                        name: item.name,
                    }))}
                    DValue={defaultId}
                />
            ),
        },
        {
            name: "phoneNumber",
            label: "Soatlik ish haqi",
            input: <Input style={{ width: "100%" }} />,
        },
    ];

    const workingTimesFormData = [
        {
            name: "workerId",
            label: "Ishchilar",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Ishchini tanlang"}
                    selectData={workerData?.map((item) => ({
                        ...item,
                        name: item.fio,
                    }))}
                />
            ),
        },
    ];

    const editWorkingTimesFormData = [
        {
            name: "workerId",
            label: "Ishchilar",
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Ishchini tanlang"}
                    selectData={workerData?.map((item) => ({
                        ...item,
                        name: item.fio,
                    }))}
                    DValue={defaultId}
                />
            ),
        },
        {
            name: "startTime",
            label: "startTime",
            input: <Input style={{ width: "100%" }} />,
        },
        {
            name: "endTime",
            label: "endTime",
            input: <Input style={{ width: "100%" }} />,
        },
    ];


    const salaryFormData = [
        {
            name: "workerId",
            label: "Ishchilar",
            input: (
                <CustomSelect selectData={workerData?.map((item) => ({
                        ...item,
                        name: item.fio,
                    }))}
                    backValue={"id"}
                    placeholder={"Ishchini tanlang"}
                />
            ),
        },
        {
            name: "salary",
            label: "Ish haqi",
            input: <Input style={{ width: "100%" }} />,
        },
        {
            name: "monthId",
            label: "Oylar",
            input: (
                <CustomSelect selectData={monthData?.map((item) => ({
                        ...item,
                        name: item.name,
                    }))}
                    backValue={"id"}
                    placeholder={"Oyni tanlang"}
                />
            ),
        },
    ];

    const editSalaryFormData = [
        {
            name: "workerId",
            label: "Ishchilar",
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Ishchini tanlang"}
                    selectData={workerData?.map((item) => ({
                        ...item,
                        name: item.fio,
                    }))}
                    DValue={defaultId}
                />
            ),
        },
        {
            name: "salary",
            label: "Ish haqi",
            input: <Input style={{ width: "100%" }} />,
        },
        {
            name: "monthId",
            label: "Oylar",
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Oyni tanlang"}
                    selectData={monthData?.map((item) => ({
                        ...item,
                        name: item.name,
                    }))}
                    DValue={defaultId}
                />
            ),
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

    const getMonthsData = () => {
        instance
            .get("api/turnstile/month/list")
            .then((data) => {
                setMonthsData(data.data.data);
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
        getMonthsData();
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
        case "/Ishchilar": {
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
        case "/Ish-vaqtlari": {
            formData = {
                formData: workingTimesFormData,
                editFormData: editWorkingTimesFormData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: false,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "O'zgartirish",
                modalTitle: "Yangi qo'shish",
            };
            break;
        }
        case "/Ish-haqilari": {
            formData = {
                formData: salaryFormData,
                editFormData: editSalaryFormData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: false,
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
        getPositionData,
        getWorkerData,
        getMonthsData,
        workerData,
        dataTurnstileData,
        monthData,
    };

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
};
