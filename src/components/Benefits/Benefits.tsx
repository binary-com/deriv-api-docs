import React from 'react';
export const Benefits = () => {
    return (
        <div className='main-page-row'>
            <div className={`column-container ${styles.benefitsContainer}`}>
                <h1>Benefits of using Deriv API</h1>
                <div className={`container ${styles.benefitsIcons}`}>
                    <div className='single-container'>
                        <div className={`${styles.automationIcon} ${styles.image}`} />
                        <p>Automation</p>
                    </div>
                    <div className='single-container'>
                        <div className={`${styles.integrationIcon} ${styles.image}`} />
                        <p>Easy integration</p>
                    </div>
                    <div className='single-container'>
                        <div className={`${styles.executionIcon} ${styles.image}`} />
                        <p>Fast execution</p>
                    </div>
                </div>
                {/* <div className={styles.benefits}>
                    <div className={styles.personalisationContainer}>
                        <div className={styles.personalisationImage} />
                        <div className={styles.personalisation}>
                            <h3>Personalise your trading</h3>
                            <p>
                                Personalise your trading apps to match your needs. Create charts and views the way you
                                like them. Develop your trading app using any common programming language and extend
                                your trading opportunities.
                            </p>
                        </div>
                    </div>
                    <div className={styles.earnMoreContainer}>
                        <div className={styles.earnMoreImage} />
                        <div className={styles.earnMore}>
                            <h3>Build a business and earn more</h3>
                            <p>
                                Create your own trading apps by taking advantage of the power of Deriv's trading
                                services. Share your apps with fellow traders or customers, and get a chance to earn
                                more or build your own business.
                            </p>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};
