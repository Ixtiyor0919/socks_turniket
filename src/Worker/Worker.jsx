import { useState } from "react";
import instance from "../Api/Axios";
import { message } from "antd";
import CustomTable from "../Module/Table/Table";
import { useNavigate } from "react-router-dom";
import { useData } from "../Hook/UseData";

const Worker = () => {
    const [outcomeSocks, setOutcomeSocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const { dataTurnstileData } = useData();
    const navigate = useNavigate();

    const getOutcomeSocks = (current, pageSize) => {
        setLoading(true);
        instance
            .get(`api/turnstile/worker/getAllPageable?page=${current}&size=${pageSize}`)
            .then((data) => {
                setOutcomeSocks(data.data?.data?.branches);
                setTotalItems(data.data?.data?.totalItems);
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Ishchilarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const columns = [
        {
            title: "Ishchining ismi",
            dataIndex: "fio",
            key: "fio",
            width: "33%",
            search: false,
            sorter: (a, b) => {
                if (a.fio < b.fio) {
                    return -1;
                }
                if (a.fio > b.fio) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Lavozimlar",
            dataIndex: "positionId",
            key: "positionId",
            width: "33%",
            search: false,
            render: (record) => {
                const data = dataTurnstileData?.filter((item) => item.id === record);
                return data[0]?.name;
            },
            sorter: (a, b) => {
                if (a.positionId < b.positionId) {
                    return -1;
                }
                if (a.positionId > b.positionId) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Soatlik ish haqi",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            width: "50%",
            search: false,
            sorter: (a, b) => {
                if (a.phoneNumber < b.phoneNumber) {
                    return -1;
                }
                if (a.phoneNumber > b.phoneNumber) {
                    return 1;
                }
                return 0;
            },
        },
    ];

    const onCreate = (values) => {
        setLoading(true);
        instance
            .post("api/turnstile/worker/add", { ...values })
            .then(function (response) {
                message.success("Ishchi muvaffaqiyatli qo'shildi");
                getOutcomeSocks(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Ishchini qo'shishda muammo bo'ldi");
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
                id: initial.id,
                delete: false,
            })
            .then((res) => {
                message.success("Ishchi muvaffaqiyatli taxrirlandi");
                getOutcomeSocks(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Ishchini taxrirlashda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
        setLoading(true);
    };

    const handleDelete = (arr) => {
        setLoading(true);
        arr.map((item) => {
            instance
                .delete(`api/turnstile/worker/delete/${item}`)
                .then((data) => {
                    getOutcomeSocks(current - 1, pageSize);
                    message.success("ishchi muvaffaqiyatli o'chirildi");
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response?.status === 500)
                        navigate("/server-error");
                    message.error("ishchini o'chirishda muammo bo'ldi");
                })
                .finally(() => setLoading(false));
            return null;
        });
    };

    return (
        <>
            <CustomTable
                onEdit={onEdit}
                onCreate={onCreate}
                onDelete={handleDelete}
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

export default Worker;
