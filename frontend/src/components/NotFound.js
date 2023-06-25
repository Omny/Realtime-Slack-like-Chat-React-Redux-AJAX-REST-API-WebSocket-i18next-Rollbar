import { useTranslation } from 'react-i18next';
import notFoundImg from '../images/not-found.svg';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt="Страница не найдена" className="img-fluid h-25" src={notFoundImg} />
      <h1 className="h4 text-muted">
        {t('notFound.title')}
      </h1>
      <p className="text-muted">
        {t('notFound.message')}
        {' '}
        <a href="/">
          {t('notFound.linkText')}
        </a>
      </p>
    </div>
  );
};

export default NotFound;
