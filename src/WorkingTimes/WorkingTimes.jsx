import { useState } from "react";
import instance from "../Api/Axios";
import { message } from "antd";
import CustomTable from "../Module/Table/Table";
import { useNavigate } from "react-router-dom";
import { useData } from "../Hook/UseData";
import moment from "moment";

const WorkingTimes = () => {
    const [outcomeSocks, setOutcomeSocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const navigate = useNavigate();
    const { workerData } = useData();

    const getOutcomeSocks = (current, pageSize) => {
        setLoading(true);
        instance
            .get(
                `api/turnstile/workingTimes/getAllPageable?page=${current}&size=${pageSize}`
            )
            .then((data) => {
                const apiData = data.data?.data?.allWorkers.map((item) => {
                    return {
                        ...item,
                        startTime: moment(item.startTime).format("DD-MM-YYYY"),
                        endTime: moment(item.endTime).format("DD-MM-YYYY"),
                    };
                });
                setOutcomeSocks(apiData);
                setTotalItems(data.data?.data?.totalItems);
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Ish vaqtlarini yuklashda muammo bo'ldi");
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
            title: "Boshlanish vaqti",
            dataIndex: "startTime",
            key: "startTime",
            width: "33%",
            search: false,
            sorter: (a, b) => {
                if (a.startTime < b.startTime) {
                    return -1;
                }
                if (a.startTime > b.startTime) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Tugash vaqti",
            dataIndex: "endTime",
            key: "endTime",
            width: "33%",
            search: false,
            sorter: (a, b) => {
                if (a.endTime < b.endTime) {
                    return -1;
                }
                if (a.endTime > b.endTime) {
                    return 1;
                }
                return 0;
            },
        },
    ];

    const onCreate = (values) => {
        setLoading(true);
        instance
            .post("api/turnstile/workingTimes/add", { ...values })
            .then(function (response) {
                message.success("Ish vaqti muvaffaqiyatli qo'shildi");
                getOutcomeSocks(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Ish vaqtini qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onEdit = (values, initial) => {
        setLoading(true);
        instance
            .put(`api/turnstile/workingTimes/update/${initial.id}`, {
                ...values,
            })
            .then((res) => {
                message.success("Ish vaqti muvaffaqiyatli taxrirlandi");
                getOutcomeSocks(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Ish vaqtini taxrirlashda muammo bo'ldi");
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
                getData={getOutcomeSocks}
                columns={columns}
                tableData={outcomeSocks}
                current={current}
                pageSize={pageSize}
                totalItems={totalItems}
                loading={loading}
                setLoading={setLoading}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                pageSizeOptions={[10, 20]}
            />
        </>
    );
};

export default WorkingTimes;
