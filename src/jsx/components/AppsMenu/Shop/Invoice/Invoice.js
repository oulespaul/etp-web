import React, { Fragment } from "react";
import useAxios from "../../../../../hooks/useAxios";
import FileSaver from "file-saver";
import { connect } from "react-redux";
import { formatDatetime } from "../../../../../utils/formatDatetime";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Invoice = ({ user }) => {
  const { t } = useTranslation();
  const [invoiceData, invoiceDataErr, invoiceDataLoading] = useAxios({
    url: `/trade/invoice/${user?.clientId}`,
    method: "GET",
  });
  const [, , , downloadInvoice] = useAxios(
    {
      url: `/trade/invoice/download/${user?.clientId}`,
      method: "GET",
      responseType: "blob",
    },
    false
  );

  const downloadInvoiceHandler = async () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const fileName = `${user.clientId}_${year}${month}.pdf`;

    const response = await downloadInvoice();

    return FileSaver.saveAs(response, fileName);
  };

  if (invoiceDataLoading) return <>Loading...</>;

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card mt-3">
            <div className="card-header">
              {" "}
              <strong>
                {t("invoice.lastUpdate")}: {formatDatetime(new Date())}
              </strong>{" "}
              {invoiceData && (
                <Button
                  className="me-2"
                  variant="primary"
                  onClick={downloadInvoiceHandler}
                >
                  {t("invoice.download")}
                </Button>
              )}
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-border">
                  {!invoiceDataErr ? (
                    <>
                      <thead>
                        <tr>
                          <th className="text-center">
                            {t("invoice.field.item")}
                          </th>
                          <th></th>
                          <th></th>
                          <th className="text-center">
                            {t("invoice.field.qty")}
                          </th>
                          <th className="text-center">
                            {t("invoice.field.total")}
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {invoiceData?.items?.slice(0, 3).map((item) => (
                          <tr>
                            <td className="text-center">{item.task}</td>
                            <td className="left"></td>
                            <td className="left"></td>
                            <td className="text-center">{item.quantity}</td>
                            <td className="text-center">{item.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </>
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        <h5>{t("invoice.invoiceNotfound")}</h5>
                      </td>
                    </tr>
                  )}
                </table>
                <div className="row">
                  <div className="col-lg-4 col-sm-5"> </div>
                  <div className="col-lg-4 col-sm-5 ms-auto">
                    <table className="table table-clear">
                      <tbody>
                        {invoiceData?.items?.slice(3, 7).map((item) => (
                          <tr>
                            <td className="left">
                              <strong>{item.task}</strong>
                            </td>
                            <td className="right">{item.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth.auth };
};

export default connect(mapStateToProps)(Invoice);
