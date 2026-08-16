import { useClasses } from '../hooks/classes/useClasses';
import { ClassSelector } from '../components/classes/ClassSelector';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ClassDetail } from '../components/classes/ClassDetail';

export function Classes() {
    const { data: classes, isLoading, isError } = useClasses();

    const [selectedIndex, setSelectedIndex] =
        useState<number>(3);

    const location = useLocation();

    useEffect(() => {
        if (!classes) return;

        const classIndex = location.state?.classIndex;

        if (
            typeof classIndex === 'number' &&
            classIndex >= 0 &&
            classIndex < classes.length
        ) {
            setSelectedIndex(classIndex);
        }
    }, [classes, location.state]);

    return (
        <main className="mx-auto w-full max-w-5xl px-4 pb-20 pt-6 sm:px-6 sm:pt-10 lg:px-8">
            {isLoading && (
                <div className="flex items-center justify-center py-24">
                    <span className="h-8 w-8 animate-spin rounded-full border-2 border-custom-golden border-t-transparent" />
                </div>
            )}

            {isError && (
                <div className="flex items-center justify-center py-24">
                    <p className="text-center text-sm font-semibold">
                        Failed to load dragon classes.
                    </p>
                </div>
            )}

            {classes && (
                <div className="flex flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-start lg:gap-10 lg:px-0">
                    <ClassSelector
                        dragonClasses={classes}
                        selectedIndex={selectedIndex}
                        onSelect={setSelectedIndex}
                    />

                    <ClassDetail
                        dragonClass={classes[selectedIndex]}
                    />
                </div>
            )}
        </main>
    );
}