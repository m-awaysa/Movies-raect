import React from 'react';

const CustomInput = ({ placeholder, type, name, onChange, error }) => {
    return (
        // <div>
        //     <input onChange={onChange} className="form-control  my-2" placeholder={placeholder} type={type} name={name} />
        //     {error && <div className='text-danger'>{error}</div>}
        // </>
        <div className="sign__group">
            <input onChange={onChange} className="sign__input" placeholder={placeholder} type={type} name={name} />
            {error && <div className='text-danger'>{error}</div>}
        </div>

    );
}

export default CustomInput;
