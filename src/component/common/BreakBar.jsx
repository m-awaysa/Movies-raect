import React from 'react'

function BreakBar({translate,title, classes='break_bar pb-2 pt-1 mb-5 mt-5'}) {
    return (
        <>
            <div className={classes}>
                <div className="container ">
                    <h2 className={`content__title pt-2 text-warning fs-3 ` + translate('flex_end_or_start')}>{title}</h2>
                </div>
            </div>
        </>
    )
}

export default BreakBar