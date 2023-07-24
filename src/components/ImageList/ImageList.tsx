import { Card, CardContent, Grid, Button } from '@mui/material';
import "./ImageList.css" // Import your custom CSS file
import { useState } from "react"

export interface ImageData {
    id: string,
    urls: {
        small: string
    },
    description: string | undefined
}
interface ImageListProps {
    images: ImageData[]
    imagePerPage: number
}

function ImageList({ images, imagePerPage }: ImageListProps) {

    const [currentPage, setCurrentPage] = useState<number>(1)

    // Calculate the index range for the current page
    const indexOfLastImage = currentPage * imagePerPage
    const indexOfFirstImage = indexOfLastImage - imagePerPage
    const currentImages = images.slice(indexOfFirstImage, indexOfLastImage)

    const handleNextPage = () => {
        setCurrentPage((prevPage: number) => prevPage + 1)
    }
    const handlePreviousPage = () => {
        setCurrentPage((prevPage: number) => prevPage - 1)
    }
    return (
        <Grid container spacing={2} justifyContent="space-between">
            {currentImages.length > 0 ? (
                currentImages.map((image) => (
                    <Grid key={image.id} item xs={12} sm={6} md={4} style={{ marginTop: '20px' }}>
                        <Card className="image-card">
                            <img
                                src={image.urls.small}
                                alt={image.description}
                                className="image"
                            />
                            <CardContent className="description">
                                <p>{image.description || 'No description available'}</p>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            ) : (
                ""
            )}

            {/* pagination */}

            <Grid container justifyContent="center" mt={3}>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={currentPage === 1}
                    onClick={handlePreviousPage}
                >
                    Previous Page
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={indexOfLastImage >= images.length}
                    onClick={handleNextPage}
                >
                    Next Page
                </Button>
            </Grid>
        </Grid>
    );
}

export default ImageList;
