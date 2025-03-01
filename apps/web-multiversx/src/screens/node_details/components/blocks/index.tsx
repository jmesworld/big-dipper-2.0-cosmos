import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import Typography from '@mui/material/Typography';
import Box from '@/components/box';
import BlocksList from '@/components/blocks_list';
import NoData from '@/components/no_data';
import useStyles from '@/screens/node_details/components/blocks/styles';

const Blocks: FC<{ className?: string; blocks: BlockType[] }> = (props) => {
  const { t } = useTranslation('nodes');
  const { classes } = useStyles();
  let component = null;
  if (!props.blocks.length) {
    component = <NoData />;
  } else {
    component = <BlocksList items={props.blocks} />;
  }
  return (
    <Box className={props.className}>
      <Typography className={classes.title} variant="h2">
        {t('blocks')}
      </Typography>
      {component}
    </Box>
  );
};

export default Blocks;
