import CapsuleCard from '../capsulecard/CapsuleCard'

import './Popular.css'

const Popular = () => {
    return (
        <>
            <section className="popular">
                <div className="section-header">
                    <h2>Più Popolari</h2>
                    <p>Le capsule più amate dai nostri clienti</p>
                </div>

                <div>
                    <CapsuleCard />
                </div>
            </section>
        </>
    )
}

export default Popular