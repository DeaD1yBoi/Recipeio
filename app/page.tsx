"use client";
import {
  CustomButton,
  Hero,
  Loading,
  RecipeCard,
  SearchBar,
  ShowMore,
} from "@/Components";
import usePageHooks from "@/hooks";


export default function Home() {
  const { allRecipes, isDataEmpty, setFilter, handleClick, filter, loading } =
    usePageHooks();
  return (
    <main className="overflow-hidden">
      <Hero setFilter={setFilter} />
      <div className="mt-6 px-8 flex flex-wrap" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Recipe Catalogue</h1>
          <p>Explore new recepies</p>
        </div>
        <div className="home__filters">
          <SearchBar setFilter={setFilter} />
          <div className="home__filter-container"></div>
        </div>
        {loading ? <Loading /> : !isDataEmpty ? (
          <section>
            <div className="home__recipe-wrapper">
              {allRecipes?.map((recipe) => (
                <RecipeCard
                  key={recipe._id.toString()}
                  setFilter={setFilter}
                  recipe={recipe}
                />
              ))}
            </div>
            <ShowMore
              pageNumber={filter.limit / 8}
              isNext={filter.limit > allRecipes?.length!}
              setFilter={setFilter}
              filter={filter}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-2xl font-bold">No results found</h2>
            <p>Try different keywords</p>
            <CustomButton
              title="Clear search params"
              containerStyles="bg-primary-blue text-white rounded-full"
              handleClick={handleClick}
            />
          </div>
        )}
      </div>
    </main>
  );
}
