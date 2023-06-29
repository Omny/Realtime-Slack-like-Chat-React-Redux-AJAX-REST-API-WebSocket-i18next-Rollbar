import { useTranslation } from 'react-i18next';
import notFoundImg from '../images/not-found.svg';

const ErrorDisplay = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img alt={t('errors.title')} className="img-fluid h-25" src={notFoundImg} />
      <h1 className="h4 text-muted">
        {t('errors.title')}
      </h1>
      <p className="text-muted">
        {t('errors.text')}
        {' '}
      </p>
    </div>
  );
};

export default ErrorDisplay;
