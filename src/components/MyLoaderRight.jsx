import ContentLoaderRight from 'react-content-loader';

function MyLoaderRight() {
  return (
    <ContentLoaderRight
      speed={2}
      width={1500}
      height={1500}
      viewBox="0 0 1500 1500"
      backgroundColor="#313131">
      <rect x="0" y="250" rx="0" ry="0" width="250" height="150" />
      <rect x="0" y="425" rx="0" ry="0" width="250" height="150" />
      <rect x="0" y="600" rx="0" ry="0" width="250" height="150" />
    </ContentLoaderRight>
  );
}

export default MyLoaderRight;
