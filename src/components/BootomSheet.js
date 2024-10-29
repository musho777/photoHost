import React, { useCallback, forwardRef } from 'react';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
export const BootomModal = forwardRef(({ children, snapPoints, close = () => { } }, ref) => {


  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
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

