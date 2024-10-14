import React, { useCallback, useMemo, forwardRef } from 'react';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
export const BootomModal = forwardRef(({ children, snapPoints, close = () => { } }, ref) => {

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        // animatedIndex={{
        //   value: 1,
        // }}
        disappearsOnIndex={-1} // Optionally control when the backdrop disappears
        appearsOnIndex={0}
        opacity={0.85}
      />
    ), [])

  return (
    <BottomSheetModal
      onChange={(index) => {
        if (index === -1) {
          close()
        }
      }}
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
    >
      {children}
    </BottomSheetModal >
  );
});

