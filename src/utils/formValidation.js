// utils/formValidation.js

export const validateForm = (formValues) => {
    const errors = {};

    if (!formValues.projectId) {
        errors.projectId = "Project is required";
    }

    if (!formValues.taskName?.trim()) {
        errors.taskName = "Task Name is required";
    }

    if (!formValues.description?.trim()) {
        errors.description = "Description is required";
    }

    if (formValues.statusId === undefined || formValues.statusId === null || formValues.statusId === "") {
        errors.statusId = "Status is required";
    }

    if (formValues.originalEstimate <= 0) {
        errors.originalEstimate = "Original Estimate must be greater than 0";
    }

    if (formValues.timeTrackingSpent > formValues.originalEstimate) {
        errors.timeTrackingSpent = "Time Tracking Spent must small than original estimate";
    }

    if (formValues.timeTrackingRemaining < 0) {
        errors.timeTrackingRemaining = "Time Tracking Remaining cannot be negative";
    }

    if (formValues.typeId === undefined || formValues.typeId === null || formValues.typeId === "") {
        errors.typeId = "Task type is required";
    }

    if (formValues.priorityId === undefined || formValues.priorityId === null || formValues.priorityId === "") {
        errors.priorityId = "Priority is required";
    }

    if (formValues.listUserAsign.length === 0) {
        errors.listUserAsign = "At least one user must be assigned";
    }

    return errors;
};
