interface PageProps {
    params: {
        subject: string;
    };
}

export default function Page({ params }: PageProps) {
    return (
        <div>
            {params.subject}
        </div>
    );
}
