import React from 'react';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import Layout from '@/components/layout';
import List from '@/screens/tokens/components/list';
import useStyles from '@/screens/tokens/styles';

const Tokens = () => {
  const { classes } = useStyles();
  const { t } = useTranslation('tokens');

  return (
    <>
      <NextSeo
        title={t('tokens') ?? undefined}
        openGraph={{
          title: t('tokens') ?? undefined,
        }}
      />
      <Layout navTitle={t('tokens') ?? undefined} className={classes.root}>
        <List />
      </Layout>
    </>
  );
};

export default Tokens;
