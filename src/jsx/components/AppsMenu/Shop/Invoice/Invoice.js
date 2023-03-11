import React, { Fragment } from "react";
import useAxios from "../../../../../hooks/useAxios";
import FileSaver from "file-saver";
import { connect } from "react-redux";
import { formatDatetime } from "../../../../../utils/formatDatetime";
import { Button } from "react-bootstrap";

const Invoice = ({ user }) => {
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
              <strong>Last Update: {formatDatetime(new Date())}</strong>{" "}
              {invoiceData && (
                <Button
                  className="me-2"
                  variant="primary"
                  onClick={downloadInvoiceHandler}
                >
                  Download
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
                          <th className="text-center">Item</th>
                          <th className="text-center">Kwh</th>
                          <th className="text-center">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceData?.items?.slice(0, 3).map((item) => (
                          <tr>
                            <td className="text-center">{item.task}</td>
                            <td className="text-center">{item.quantity}</td>
                            <td className="text-center">{item.value}</td>
                          </tr>
                        ))}
                      </tbody>
                      <div className="row">
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
                    </>
                  ) : (
                    <tr>
                      <td colspan="6" style={{ textAlign: "center" }}>
                        <h5>Invoice this month not found</h5>
                      </td>
                    </tr>
                  )}
                </table>
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
