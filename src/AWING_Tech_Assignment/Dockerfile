FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
ENV ASPNETCORE_HTTP_PORTS=80;443
WORKDIR /src
COPY ["src/AWING_Tech_Assignment/AWING_Tech_Assignment.csproj", "src/AWING_Tech_Assignment/"]
RUN dotnet restore "src/AWING_Tech_Assignment/AWING_Tech_Assignment.csproj"
COPY . .
WORKDIR "/src/src/AWING_Tech_Assignment"
RUN dotnet build "./AWING_Tech_Assignment.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./AWING_Tech_Assignment.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AWING_Tech_Assignment.dll"]
