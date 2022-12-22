import { useState } from "react";
import instance from "../Api/Axios";
import { message } from "antd";
import CustomTable from "../Module/Table/Table";
import { useNavigate } from "react-router-dom";
import { useData } from "../Hook/UseData";

const Salary = () => {
    const [responseData, setResponseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { workerData, monthData } = useData();
    const navigate = useNavigate();

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
                message.error("Maoshlarni yuklashda muammo bo'ldi");
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
            render: (record) => {
                const data = monthData?.filter((item) => item.id === record);
                return data[0]?.name;
            },
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

    const onCreate = (values) => {
        setLoading(true);
        instance
            .post("api/turnstile/salary", { ...values })
            .then(function (response) {
                message.success("Ish haqi muvaffaqiyatli qo'shildi");
                getResponseFunc(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Ish haqini qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onEdit = (values, initial) => {
        setLoading(true);
        instance
            .put(`api/turnstile/salary?salaryId=${initial.id}`, {
                ...values,
                id: initial.id,
                delete: false,
            })
            .then((res) => {
                message.success("Ish haqi muvaffaqiyatli taxrirlandi");
                getResponseFunc(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Ish haqini taxrirlashda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
        setLoading(true);
    };

    return (
        <>
            <CustomTable
                onEdit={onEdit}
                onCreate={onCreate}
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
