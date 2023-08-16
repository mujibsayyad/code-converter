import styles from '@/styles/Main.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>

      <p>
        <i className='fab social-icons fa-github'></i>
        <a
          href='https://github.com/mujibsayyad/code-converter'
          target='_blank'
          rel='noopener'
        >
          {' '}
          Source Code
        </a>
      </p>
    </footer>
  );
};

export default Footer;
