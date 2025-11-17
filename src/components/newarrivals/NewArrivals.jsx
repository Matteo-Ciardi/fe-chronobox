import CapsuleCard from '../capsulecard/CapsuleCard'

import './NewArrivals.css'

const NewArrivals = () => {
    return (
        <>
            <section className="new-arrivals">
                <div className="section-header">
                    <h2>Nuovi Arrivi</h2>
                    <p>Scopri le nostre ultime capsule del tempo</p>
                </div>

                <div>
                    <CapsuleCard />
                </div>
            </section>
        </>
    )
}

export default NewArrivals