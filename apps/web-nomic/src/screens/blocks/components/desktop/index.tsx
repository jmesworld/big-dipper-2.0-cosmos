import Loading from '@/components/loading';
import Timestamp from '@/components/Timestamp';
import { useGrid } from '@/hooks/use_react_window';
import useStyles from '@/screens/blocks/components/desktop/styles';
import { columns } from '@/screens/blocks/components/desktop/utils';
import type { BlockType } from '@/screens/blocks/types';
import { BLOCK_DETAILS } from '@/utils/go_to_page';
import { mergeRefs } from '@/utils/merge_refs';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import numeral from 'numeral';
import { FC, LegacyRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

type DesktopProps = {
  className?: string;
  items: BlockType[];
  itemCount: number;
  loadMoreItems: (...arg: unknown[]) => void;
  isItemLoaded?: (index: number) => boolean;
};

const Desktop: FC<DesktopProps> = ({
  className,
  items,
  itemCount,
  loadMoreItems,
  isItemLoaded,
}) => {
  const { t } = useTranslation('blocks');
  const { classes, cx } = useStyles();
  const { gridRef, columnRef, onResize, getColumnWidth, getRowHeight } = useGrid(columns);

  const formattedItems = items?.map((x) => ({
    height: (
      <Link shallow prefetch={false} href={BLOCK_DETAILS(x.height)} className="value">
        {numeral(x.height).format('0,0')}
      </Link>
    ),
    txs: numeral(x.txs).format('0,0'),
    time: <Timestamp timestamp={x.timestamp} />,
    hash: x.hash,
  }));

  return (
    <div className={cx(classes.root, className)}>
      <AutoSizer onResize={onResize}>
        {({ height, width }) => (
          <>
            {/* ======================================= */}
            {/* Table Header */}
            {/* ======================================= */}
            <Grid
              ref={columnRef as LegacyRef<Grid>}
              columnCount={columns.length}
              columnWidth={(index) => getColumnWidth(width ?? 0, index)}
              height={50}
              rowCount={1}
              rowHeight={() => 50}
              width={width ?? 0}
            >
              {({ columnIndex, style }) => {
                const { key, align } = columns[columnIndex];

                return (
                  <div style={style} className={classes.cell}>
                    <Typography variant="h4" align={align}>
                      {t(key)}
                    </Typography>
                  </div>
                );
              }}
            </Grid>
            {/* ======================================= */}
            {/* Table Body */}
            {/* ======================================= */}
            <InfiniteLoader
              isItemLoaded={isItemLoaded ?? (() => true)}
              itemCount={itemCount}
              loadMoreItems={
                loadMoreItems ??
                (() => {
                  // do nothing
                })
              }
            >
              {({ onItemsRendered, ref }) => (
                <Grid
                  onItemsRendered={({
                    visibleRowStartIndex,
                    visibleRowStopIndex,
                    overscanRowStopIndex,
                    overscanRowStartIndex,
                  }) => {
                    onItemsRendered({
                      overscanStartIndex: overscanRowStartIndex,
                      overscanStopIndex: overscanRowStopIndex,
                      visibleStartIndex: visibleRowStartIndex,
                      visibleStopIndex: visibleRowStopIndex,
                    });
                  }}
                  ref={mergeRefs(gridRef, ref)}
                  columnCount={columns.length}
                  columnWidth={(index) => getColumnWidth(width ?? 0, index)}
                  height={(height ?? 0) - 50}
                  rowCount={itemCount}
                  rowHeight={getRowHeight}
                  width={width ?? 0}
                  className="scrollbar"
                >
                  {({ columnIndex, rowIndex, style }) => {
                    if (!isItemLoaded?.(rowIndex) && columnIndex === 0) {
                      return (
                        <div
                          style={{
                            ...style,
                            width,
                          }}
                        >
                          <Loading />
                        </div>
                      );
                    }

                    if (!isItemLoaded?.(rowIndex)) {
                      return null;
                    }

                    const { key, align } = columns[columnIndex];
                    const item =
                      formattedItems[rowIndex][key as keyof (typeof formattedItems)[number]];
                    return (
                      <div
                        style={style}
                        className={cx(classes.cell, classes.body, {
                          odd: !(rowIndex % 2),
                        })}
                      >
                        <Typography variant="body1" align={align} component="div">
                          {item}
                        </Typography>
                      </div>
                    );
                  }}
                </Grid>
              )}
            </InfiniteLoader>
          </>
        )}
      </AutoSizer>
    </div>
  );
};

export default Desktop;
