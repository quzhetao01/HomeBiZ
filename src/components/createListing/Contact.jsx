import React, { useState } from "react";

const Contact = (props) => {

    return <div>
        <h4>Contact Details</h4>
            <div className="mb-3 p-2 row">
                <label className="col-sm-2 col-form-label">Number</label>
                <div className="col-sm-10">
                <input type="number" placeholder="Number" className="form-control" value={props.listing.contact} onChange={(e) => props.handleNumber(e.target.value)}/>
                </div>
                <div class="form-check form-check-inline" onChange={e => props.handleMethod(e.target.value)}>
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1"/>
                <label class="form-check-label" for="inlineRadio1">Whatsapp</label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2"/>
                <label class="form-check-label" for="inlineRadio2">Telegram</label>
                </div>
            </div>
            <div className="mb-3 p-2 row">
                <label className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                <input placeholder="Email" className="form-control" value={props.listingemail} onChange={(e) => props.handleEmail(e.target.value)}/>
                </div>
            </div>

    </div>
}

export default Contact;