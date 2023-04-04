import React from 'react';
import { Carousel as BootstrapCarousel } from 'react-bootstrap';
import ChildDetails from './ChildDetails';

const Carousel = ({ children }) => {
return (
    <BootstrapCarousel>
    {children.map((child) => (
        <BootstrapCarousel.Item key={child.id}>
        <ChildDetails child={child} />
        </BootstrapCarousel.Item>
    ))}
    </BootstrapCarousel>
);
};

export default Carousel;
