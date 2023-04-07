import React from 'react';
import {Carousel as BootstrapCarousel} from 'react-bootstrap';
import ChildDetails from './ChildDetails';
import {deleteDoc, doc} from 'firebase/firestore';
import {db} from "../firebase";

const Carousel = ({children, onRefresh}) => {


    const deleteChildFromDb = async (id) => {
        try {
            await deleteDoc(doc(db, "children", id));
        } catch (error) {
            console.error("Error removing child: ", error);
        }
    };

    const updateChild = (id) => {
        // handle updating child details here
        console.log('Update child with id:', id);
    };

    const removeChild = (id) => {
        const childToRemove = children.find((c) => c.id === id);
        const childFullName = `${childToRemove.lowFirstName} ${childToRemove.lowLastName}`.toUpperCase();

        if (window.confirm(`Are you sure you want to remove this child: ${childFullName}?`)) {
            deleteChildFromDb(id);
            console.log("Remove child with id:", id);
            onRefresh(); // Trigger a refresh in the Home component
        }
    };
    return (
        <BootstrapCarousel>
            {children.map((child) => (
                <BootstrapCarousel.Item key={child.id}>
                    <ChildDetails child={child} updateChild={updateChild} removeChild={removeChild}/>
                </BootstrapCarousel.Item>
            ))}
        </BootstrapCarousel>
    );
};

export default Carousel;
