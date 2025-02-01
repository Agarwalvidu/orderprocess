import React from "react";

export const Inventory = () => {
  const movies = [
    {
      title: "Inside Out 2",
      released: 2024,
      studio: "Disney Pixar",
      worldwideGross: "$1,698,863,816",
      domesticGross: "$652,980,194",
      internationalGross: "$1,045,883,622",
      budget: "$200,000,000",
    },
    {
      title: "The Lion King (2019 remake)",
      released: 2019,
      studio: "Disney",
      worldwideGross: "$1,662,020,819",
      domesticGross: "$543,638,043",
      internationalGross: "$1,118,382,776",
      budget: "$260,000,000",
    },
    {
      title: "Frozen II",
      released: 2019,
      studio: "Disney",
      worldwideGross: "$1,453,683,476",
      domesticGross: "$477,373,578",
      internationalGross: "$976,309,898",
      budget: "$150,000,000",
    },
    {
      title: "The Super Mario Bros. Movie",
      released: 2023,
      studio: "Universal",
      worldwideGross: "$1,360,847,665",
      domesticGross: "$574,934,330",
      internationalGross: "$785,913,335",
      budget: "$100,000,000",
    },
    {
      title: "Frozen",
      released: 2013,
      studio: "Disney",
      worldwideGross: "$1,281,019,275",
      domesticGross: "$400,953,009",
      internationalGross: "$880,066,266",
      budget: "$150,000,000",
    },
    {
      title: "Incredibles 2",
      released: 2018,
      studio: "Disney Pixar",
      worldwideGross: "$1,243,089,244",
      domesticGross: "$608,581,744",
      internationalGross: "$634,507,500",
      budget: "$200,000,000",
    },
    {
      title: "Minions",
      released: 2015,
      studio: "Universal",
      worldwideGross: "$1,159,444,662",
      domesticGross: "$336,045,770",
      internationalGross: "$823,398,892",
      budget: "$74,000,000",
    },
    {
      title: "Toy Story 4",
      released: 2019,
      studio: "Disney Pixar",
      worldwideGross: "$1,073,394,593",
      domesticGross: "$434,038,008",
      internationalGross: "$639,356,585",
      budget: "$200,000,000",
    },
    {
      title: "Toy Story 3",
      released: 2010,
      studio: "Disney Pixar",
      worldwideGross: "$1,066,970,811",
      domesticGross: "$415,004,880",
      internationalGross: "$651,965,931",
      budget: "$200,000,000",
    },
    {
      title: "Despicable Me 3",
      released: 2017,
      studio: "Universal",
      worldwideGross: "$1,034,800,131",
      domesticGross: "$264,624,300",
      internationalGross: "$770,175,831",
      budget: "$80,000,000",
    },
  ];

  return (
    <div className="container">
      <table className="responsive-table">
        <caption>Top 10 Grossing Animated Films of All Time</caption>
        <thead>
          <tr>
            <th scope="col">Film Title</th>
            <th scope="col">Released</th>
            <th scope="col">Studio</th>
            <th scope="col">Worldwide Gross</th>
            <th scope="col">Domestic Gross</th>
            <th scope="col">International Gross</th>
            <th scope="col">Budget</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td colSpan="7">
              Sources:{" "}
              <a
                href="http://en.wikipedia.org/wiki/List_of_highest-grossing_animated_films"
                rel="external"
              >
                Wikipedia
              </a>{" "}
              &amp;{" "}
              <a
                href="http://www.boxofficemojo.com/genres/chart/?id=animation.htm"
                rel="external"
              >
                Box Office Mojo
              </a>
              . Data is current as of January 17, 2025.
            </td>
          </tr>
        </tfoot>
        <tbody>
          {movies.map((movie, index) => (
            <tr key={index}>
              <th scope="row">{movie.title}</th>
              <td data-title="Released">{movie.released}</td>
              <td data-title="Studio">{movie.studio}</td>
              <td data-title="Worldwide Gross" data-type="currency">
                {movie.worldwideGross}
              </td>
              <td data-title="Domestic Gross" data-type="currency">
                {movie.domesticGross}
              </td>
              <td data-title="International Gross" data-type="currency">
                {movie.internationalGross}
              </td>
              <td data-title="Budget" data-type="currency">{movie.budget}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

