import React from 'react';
import { View, Modal, Image } from 'react-native';
import ImageViewer from 'react-native-image-pan-zoom';

const ZoomableImage = ({ imageUrl, isVisible, onClose }) => {
    return (
        <Modal visible={isVisible} transparent={true}>
            <ImageViewer
                imageUrls={[{ url: imageUrl }]}
                enableSwipeDown={true}
                onSwipeDown={onClose}
                enableImageZoom={true}
                saveToLocalByLongPress={false}
            />
        </Modal>
    );
};

export default ZoomableImage;
