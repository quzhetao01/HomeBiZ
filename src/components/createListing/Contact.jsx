import React, { useState } from "react";
import RequiredIcon from "../RequiredIcon";

const Contact = (props) => {

    return <div>
        {!props.edit && <h4>Contact Details</h4>}
            <div className="mb-3 p-2 row">
                <label className="col-sm-2 col-form-label"><RequiredIcon /> Number</label>
                <div className="col-sm-10">
                <input type="number" placeholder="Number" className="form-control" value={props.listing.contact} onChange={(e) => props.handleNumber(e.target.value)}/>
                </div>
                <div onChange={e => props.handleMethod(e.target.value)}>
                    <div class="form-check form-check-inline" >
                    <input class="form-check-input" type="checkbox" name="1" id="inlineRadio1" value="1" checked={props.listing.whatsapp}/>
                    <label class="form-check-label" for="inlineRadio1">Whatsapp</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" name="2" id="inlineRadio2" value="2" checked={props.listing.telegram}/>
                    <label class="form-check-label" for="inlineRadio2">Telegram</label>
                    </div>
                </div>
            </div>
            <div className="mb-3 p-2 row">
                <label className="col-sm-2 col-form-label"><RequiredIcon /> Email</label>
                <div className="col-sm-10">
                <input placeholder="Email" className="form-control" value={props.listing.email} onChange={(e) => props.handleEmail(e.target.value)}/>
                </div>
            </div>

    </div>
}

export default Contact;