import React from "react";

const Security = () => {
    return (
        <div className="tab-pane active" id="security"><h6>TURVALISUS</h6>
            <hr />
                <form>
                    <div className="form-group">
                        <label className="d-block">Muuda parooli</label>
                        <input type="text" className="form-control" placeholder="Sisesta praegune parool" />
                        <input type="text" className="form-control mt-1" placeholder="Uus parool" />
                        <input type="text" className="form-control mt-1" placeholder="Kinnita uus parool" />
                    </div>
                </form>
            <button type="button" className="btn btn-primary">Muuda parooli</button>

        </div>
    )
}

export default Security;