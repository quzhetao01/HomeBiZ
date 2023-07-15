import React from 'react';
import styles from "../../styles/EditListing.module.css"


const AccordionItem = ({title, children, id}) => {
    return <div className="accordion-item">
        <div>

        
    <h2 className={`accordion-header`} id="flush-headingOne" >
      <button class={`accordion-button ${styles.header}`} collapsed type="button" data-bs-toggle="collapse" data-bs-target={`#${id}`} aria-expanded="false" aria-controls={id}>
        {title}
      </button>
    </h2>
    </div>
    <div id={id} class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
            {children}
        </div>
    </div>
  </div>
}

export default AccordionItem;