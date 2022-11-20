import { useState } from "react";
import instance from "../Api/Axios";
import { Button, Card, Col, message, notification, Row, Statistic } from "antd";
import CustomTable from "../Module/Table/Table";
import { useNavigate } from "react-router-dom";
import { ArrowUpOutlined, FrownOutlined } from "@ant-design/icons";

const Turnstile = () => {
    const [outcomeSocks, setOutcomeSocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const navigate = useNavigate();

    const getOutcomeSocks = (current, pageSize) => {
        setLoading(true);
        instance
            .get(`api/turnstile/position/page?page=${current}&size=${pageSize}`)
            .then((data) => {
                setOutcomeSocks(data.data?.data?.materials);
                setTotalItems(data.data?.data?.totalItems);
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
        {
            title: "Soatlik ish haqi",
            dataIndex: "hourlyWages",
            key: "hourlyWages",
            width: "50%",
            search: false,
            sorter: (a, b) => {
                if (a.hourlyWages < b.hourlyWages) {
                    return -1;
                }
                if (a.hourlyWages > b.hourlyWages) {
                    return 1;
                }
                return 0;
            },
        },
    ];

    const onCreate = (values) => {
        setLoading(true);
        instance
            .post("api/turnstile/position", { ...values })
            .then(function (response) {
                message.success("Klient muvaffaqiyatli qo'shildi");
                getOutcomeSocks(current - 1, pageSize);
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
            .put(`api/turnstile/position?positionId=${initial.id}`, {
                ...values,
            })
            .then((res) => {
                message.success("Klient muvaffaqiyatli taxrirlandi");
                getOutcomeSocks(current - 1, pageSize);
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

    const handleDelete = (arr) => {
        setLoading(true);
        arr.map((item) => {
            instance
                .delete(`api/turnstile/position?positionId=${item}`)
                .then((data) => {
                    getOutcomeSocks(current - 1, pageSize);
                    message.success("Klient muvaffaqiyatli o'chirildi");
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response?.status === 500)
                        navigate("/server-error");
                    message.error("Klientni o'chirishda muammo bo'ldi");
                })
                .finally(() => setLoading(false));
            return null;
        });
    };

    return (
        <>
            {/* <div
                style={{ marginBottom: "20px" }}
                className="site-statistic-demo-card"
            >
                <Row gutter={[10, 10]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Card>
                            <Statistic
                                title="Jami sarflangan summa"
                                value={totalsum?.totalSumma}
                                valueStyle={{
                                    color: "#3f8600",
                                }}
                                prefix={<ArrowUpOutlined />}
                                suffix="So'm"
                            />
                        </Card>
                    </Col>
                </Row>
            </div> */}
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

export default Turnstile;
