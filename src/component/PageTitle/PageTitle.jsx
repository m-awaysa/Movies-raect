import React from 'react';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import './PageTitle.css';


const PageTitle = ({title="Page",startPoint='Home',currentLngCode='en'}) => {
  return <>
    <section className="section section--first" data-bg="img/section/section.jpg">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section__wrap">
              <h2 className="section__title">{title}</h2>
              <Breadcrumb startPoint={startPoint} title={title} currentLngCode={currentLngCode}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
};

export default PageTitle;