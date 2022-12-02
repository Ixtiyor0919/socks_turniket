import { useState } from "react";
import instance from "../Api/Axios";
import { message } from "antd";
import CustomTable from "../Module/Table/Table";
import { useNavigate } from "react-router-dom";
import { useData } from "../Hook/UseData";

const Salary = () => {
    const [responseData, setResponseData] = useState([]);
    const [responseSecondData, setResponseSecondData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const navigate = useNavigate();
    const { workerData } = useData();

    const getResponseFunc = () => {
        setLoading(true);
        instance
            .get(`api/turnstile/salary/list`)
            .then((data) => {
                setResponseData(data.data?.data);
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Sotilgan naskilarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const getResponseSecondFunc = () => {
        setLoading(true);
        instance
            .get(`api/turnstile/month/list`)
            .then((data) => {
                setResponseSecondData(data.data?.data);
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Sotilgan naskilarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const columns = [
        {
            title: "Ishchining ismi",
            dataIndex: "workerId",
            key: "workerId",
            width: "33%",
            search: false,
            render: (record) => {
                const data = workerData?.filter((item) => item.id === record);
                return data[0]?.fio;
            },
            sorter: (a, b) => {
                if (a.workerId < b.workerId) {
                    return -1;
                }
                if (a.workerId > b.workerId) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "monthId",
            dataIndex: "monthId",
            key: "monthId",
            width: "33%",
            search: false,
            sorter: (a, b) => {
                if (a.monthId < b.monthId) {
                    return -1;
                }
                if (a.monthId > b.monthId) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "salary",
            dataIndex: "salary",
            key: "salary",
            width: "33%",
            search: false,
            sorter: (a, b) => {
                if (a.salary < b.salary) {
                    return -1;
                }
                if (a.salary > b.salary) {
                    return 1;
                }
                return 0;
            },
        },
    ];

    const columnsSecond = [
        {
            title: "Tartib Raqami",
            dataIndex: "id",
            key: "id",
            width: "50%",
            search: false,
            sorter: (a, b) => {
                if (a.id < b.id) {
                    return -1;
                }
                if (a.id > b.id) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Oy nomlari",
            dataIndex: "name",
            key: "name",
            width: "50%",
            search: false,
            sorter: (a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            },
        }
    ];


    const onCreate = (values) => {
        setLoading(true);
        instance
            .post("api/turnstile/worker/add", { ...values })
            .then(function (response) {
                message.success("Klient muvaffaqiyatli qo'shildi");
                getResponseFunc(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Klientni qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onEdit = (values, initial) => {
        setLoading(true);
        instance
            .put(`api/turnstile/worker/update/${initial.id}`, {
                ...values,
                workerUuid: initial.id,
                delete: false,
            })
            .then((res) => {
                message.success("Klient muvaffaqiyatli taxrirlandi");
                getResponseFunc(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Klientni taxrirlashda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
        setLoading(true);
    };

    // const handleDelete = (arr) => {
    //     setLoading(true);
    //     arr.map((item) => {
    //         instance
    //             .delete(`api/turnstile/worker/delete/${item}`)
    //             .then((data) => {
    //                 getResponseFunc(current - 1, pageSize);
    //                 message.success("Klient muvaffaqiyatli o'chirildi");
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //                 if (error.response?.status === 500)
    //                     navigate("/server-error");
    //                 message.error("Klientni o'chirishda muammo bo'ldi");
    //             })
    //             .finally(() => setLoading(false));
    //         return null;
    //     });
    // };

    return (
        <>
            <div>
                <h3>Oylar</h3>
                <CustomTable
                getData={getResponseSecondFunc}
                columns={columnsSecond}
                tableData={responseSecondData}
                loading={loading}
                setLoading={setLoading}
                />
            </div>
            <CustomTable
                onEdit={onEdit}
                onCreate={onCreate}
                // onDelete={handleDelete}
                getData={getResponseFunc}
                columns={columns}
                tableData={responseData}
                current={current}
                pageSize={pageSize}
                loading={loading}
                setLoading={setLoading}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                pageSizeOptions={[10, 20]}
            />
        </>
    );
};

export default Salary;
