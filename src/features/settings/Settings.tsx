import Onboarding from '@features/overview/Onboarding.tsx';
import { Card, Select, Space, List, Spin } from 'antd';
import Title from 'antd/lib/typography/Title';
import { useLocale } from '@hooks/useLocale.ts';
import LocaleSwitcher from '../../i18n/LocaleSwitcher.tsx';
import { FormattedMessage } from 'react-intl';
import useUserRoles from '@hooks/useUserRoles.ts';

import styles from './Settings.module.scss';

import { useUserProfile } from '@hooks/useUserProfile.ts';

export default function Settings() {
    const { locale, setLocale } = useLocale();
    const userRoles = useUserRoles();
    const { userProfile, isLoading, error } = useUserProfile();

    if (isLoading) return <Spin />;
    // Todo Settings: implement error handling
    if (error) return <p>Fehler beim Laden des Benutzerprofils</p>;

    return (
        <div className={styles.settingsContainer}>
            <Title level={1}>
                <FormattedMessage
                    id={'settings.title'}
                    defaultMessage={'Einstellungen'}
                    description={'Einstellungen Titel'}
                />
            </Title>
            <Space direction={'vertical'} size={'middle'} style={{ display: 'flex' }}>
                <Card size={'small'} loading={false} bordered={true} style={{ width: 350 }}>
                    <div className={styles.settingsPersonaRow}>
                        <p>{userProfile?.displayName}</p>
                        <p>{userRoles?.[0]}</p>
                    </div>
                    <p>{userProfile?.mail}</p>
                </Card>
                <div className={styles.selectWithTitleContainer}>
                    <div className={styles.title}>
                        <FormattedMessage
                            id={'settings.language'}
                            defaultMessage={'Sprache'}
                            description={'Sprachoption'}
                        />
                    </div>

                    <LocaleSwitcher setLocale={setLocale} locale={locale} />
                </div>
                <Onboarding isReadonly={true} />
                <FormattedMessage
                    id={'settings.myModules'}
                    defaultMessage={'Meine Module'}
                    description={'Meine Module'}
                />
                <Select />
                <List />
            </Space>
        </div>
    );
}
