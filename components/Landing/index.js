import {
  Navbar,
  Hero,
  Pain,
  AboutUs,
  Steps,
  PriceLanding,
  Reviews,
  CTA,
  FAQ,
  Footer,
} from "./Components";
import styles from "../../styles/LandingPage.module.scss";

const Landing = () => {
  return (
    <>
      <div className=' w-full overflow-hidden'>
        <div className='flex justify-center items-center px-4 sm:px-20 py-8 bg-dimWhite'>
          <div className={styles.boxWidth}>
            <Navbar />
            <Hero />
          </div>
        </div>
        <div className='bg-white w-full overflow-hidden'>
          <div className='flex justify-center items-center px-4 sm:px-20 sm:py-8'>
            <div className={styles.boxWidth}>
              <Pain />
            </div>
          </div>
        </div>
        {/* <div className=' w-full overflow-hidden'>
          <div className='flex justify-center items-center px-4 sm:px-20 sm:selection:py-8'>
            <div className={styles.boxWidth}>
              <AboutUs />
            </div>
          </div>
        </div> */}
        <div className='bg-dimWhite text-primary w-full overflow-hidden'>
          <div className='flex justify-center items-center px-4 sm:px-20 py-8'>
            <div className={styles.boxWidth}>
              <PriceLanding />
            </div>
          </div>
        </div>
        <div className=' w-full overflow-hidden'>
          <div className='flex justify-center items-center px-4 ss:px-10 lg:px-20 py-8'>
            <div className={styles.boxWidth}>
              <Steps />
              <CTA />
              <Reviews />
            </div>
          </div>
        </div>

        <div className='bg-white w-full overflow-hidden'>
          <div className='flex justify-center items-center px-4 sm:px-20 py-8'>
            <div className={styles.boxWidth}>
              <FAQ />
            </div>
          </div>
        </div>
      </div>
      <div className='bg-accent2'>
        <div className='flex justify-center items-center px-6 ss:px-20 '>
          <div className={`${styles.boxWidth}`}>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
