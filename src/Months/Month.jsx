import { useState } from "react";
import instance from "../Api/Axios";
import { message } from "antd";
import CustomTable from "../Module/Table/Table";
import { useNavigate } from "react-router-dom";

const Month = () => {
    const [responseData, setResponseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(0);
    const [pageSize, setPageSize] = useState(3);
    const [totalItems, setTotalItems] = useState(0);
    const navigate = useNavigate();

    const getResponseFunc = () => {
        setLoading(true);
        instance
        .get(`api/turnstile/month/page?page=${current}&size=${pageSize}`)
            .then((data) => {
                setResponseData(data.data?.data?.months);
                setTotalItems(data.data?.data?.totalItems);
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Oylarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const columns = [
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
        },
    ];

    return (
        <>
            <CustomTable
                getData={getResponseFunc}
                columns={columns}
                tableData={responseData}
                loading={loading}
                setLoading={setLoading}
                totalItems={totalItems}
                current={current}
                pageSize={pageSize}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                pageSizeOptions={[10, 20]}
            />
        </>
    );
};

export default Month;
    